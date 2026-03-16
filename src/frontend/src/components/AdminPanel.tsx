import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Settings2, Trash2, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type {
  Athlete,
  AthleteId,
  EventId,
  NewsHighlight,
  NewsId,
  SportId,
  SportsCategory,
  SportsEvent,
} from "../backend.d";
import { Status } from "../backend.d";
import {
  useCreateAthlete,
  useCreateEvent,
  useCreateNews,
  useCreateSportsCategory,
  useDeleteAthlete,
  useDeleteEvent,
  useDeleteNews,
  useDeleteSportsCategory,
  useUpdateAthlete,
  useUpdateEvent,
  useUpdateNews,
  useUpdateSportsCategory,
} from "../hooks/useMutations";
import {
  useGetAllAthletes,
  useGetAllEvents,
  useGetAllNews,
  useGetAllSportsCategories,
} from "../hooks/useQueries";

interface AdminPanelProps {
  onClose: () => void;
}

function dateToMs(iso: string): bigint {
  return BigInt(new Date(iso).getTime());
}

function msToDateInput(ms: bigint): string {
  const d = new Date(Number(ms));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function StatusBadge({ status }: { status: Status }) {
  const classes: Record<Status, string> = {
    [Status.upcoming]: "bg-blue-900/40 text-blue-300 border-blue-700/40",
    [Status.live]: "bg-red-900/40 text-red-300 border-red-700/40",
    [Status.completed]: "bg-green-900/40 text-green-300 border-green-700/40",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-condensed tracking-widest uppercase border ${classes[status]}`}
    >
      {status}
    </span>
  );
}

function Field({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="font-condensed tracking-widest uppercase text-xs text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function DeleteConfirm({
  open,
  name,
  onConfirm,
  onCancel,
  isPending,
}: {
  open: boolean;
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-card border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display">
            Delete "{name}"?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
            className="border-border"
            data-ocid="admin.cancel_button"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
            data-ocid="admin.confirm_button"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ── Athletes ──────────────────────────────────────────────────────────────
function AthletesTab() {
  const { data: athletes = [], isLoading } = useGetAllAthletes();
  const createMut = useCreateAthlete();
  const updateMut = useUpdateAthlete();
  const deleteMut = useDeleteAthlete();

  const blank = {
    name: "",
    sport: "",
    position: "",
    bio: "",
    achievements: "",
  };
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState<Athlete | null>(null);
  const [open, setOpen] = useState(false);
  const [delTarget, setDelTarget] = useState<Athlete | null>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(blank);
    setOpen(true);
  };
  const openEdit = (a: Athlete) => {
    setEditing(a);
    setForm({
      name: a.name,
      sport: a.sport,
      position: a.position,
      bio: a.bio,
      achievements: a.achievements.join(", "),
    });
    setOpen(true);
  };
  const submit = () => {
    const achievements = form.achievements
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (editing) {
      updateMut.mutate(
        { id: editing.id, ...form, achievements },
        { onSuccess: () => setOpen(false) },
      );
    } else {
      createMut.mutate(
        { ...form, achievements },
        {
          onSuccess: () => {
            setOpen(false);
            setForm(blank);
          },
        },
      );
    }
  };
  const isPending = createMut.isPending || updateMut.isPending;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {athletes.length} athletes
        </p>
        <Button
          size="sm"
          onClick={openAdd}
          className="bg-primary text-primary-foreground font-condensed tracking-widest uppercase gap-1"
          data-ocid="admin.add_button"
        >
          <Plus className="h-4 w-4" /> Add Athlete
        </Button>
      </div>
      {isLoading && (
        <div
          className="flex justify-center py-12"
          data-ocid="admin.athletes.loading_state"
        >
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
      {!isLoading && athletes.length === 0 && (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin.athletes.empty_state"
        >
          No athletes yet.
        </div>
      )}
      <div className="space-y-2">
        {athletes.map((a, i) => (
          <div
            key={String(a.id)}
            className="flex items-center justify-between p-3 bg-secondary/50 border border-border rounded-sm"
            data-ocid={`admin.athletes.item.${i + 1}`}
          >
            <div className="min-w-0">
              <p className="font-condensed font-700 tracking-widest uppercase text-sm truncate">
                {a.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {a.sport} · {a.position}
              </p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-primary"
                onClick={() => openEdit(a)}
                data-ocid={`admin.edit_button.${i + 1}`}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-destructive"
                onClick={() => setDelTarget(a)}
                data-ocid={`admin.delete_button.${i + 1}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editing ? "Edit Athlete" : "Add Athlete"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Field label="Name">
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                className="bg-input border-border"
                data-ocid="admin.form.input"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Sport">
                <Input
                  value={form.sport}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, sport: e.target.value }))
                  }
                  className="bg-input border-border"
                />
              </Field>
              <Field label="Position">
                <Input
                  value={form.position}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, position: e.target.value }))
                  }
                  className="bg-input border-border"
                />
              </Field>
            </div>
            <Field label="Bio">
              <Textarea
                value={form.bio}
                onChange={(e) =>
                  setForm((p) => ({ ...p, bio: e.target.value }))
                }
                className="bg-input border-border resize-none"
                rows={3}
              />
            </Field>
            <Field label="Achievements (comma-separated)">
              <Input
                value={form.achievements}
                onChange={(e) =>
                  setForm((p) => ({ ...p, achievements: e.target.value }))
                }
                className="bg-input border-border"
                placeholder="Olympic Gold, World Champion..."
              />
            </Field>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              data-ocid="admin.form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={submit}
              disabled={isPending}
              className="bg-primary text-primary-foreground"
              data-ocid="admin.form.submit_button"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : editing ? (
                "Save"
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DeleteConfirm
        open={!!delTarget}
        name={delTarget?.name ?? ""}
        isPending={deleteMut.isPending}
        onConfirm={() =>
          delTarget &&
          deleteMut.mutate(delTarget.id as AthleteId, {
            onSuccess: () => setDelTarget(null),
          })
        }
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}

// ── Events ────────────────────────────────────────────────────────────────
function EventsTab() {
  const { data: events = [], isLoading } = useGetAllEvents();
  const createMut = useCreateEvent();
  const updateMut = useUpdateEvent();
  const deleteMut = useDeleteEvent();

  const blank = {
    title: "",
    sportType: "",
    date: "",
    location: "",
    description: "",
    status: Status.upcoming,
  };
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState<SportsEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [delTarget, setDelTarget] = useState<SportsEvent | null>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(blank);
    setOpen(true);
  };
  const openEdit = (ev: SportsEvent) => {
    setEditing(ev);
    setForm({
      title: ev.title,
      sportType: ev.sportType,
      date: msToDateInput(ev.date),
      location: ev.location,
      description: ev.description,
      status: ev.status,
    });
    setOpen(true);
  };
  const submit = () => {
    const dateMs = dateToMs(form.date);
    if (editing) {
      updateMut.mutate(
        { id: editing.id, ...form, date: dateMs },
        { onSuccess: () => setOpen(false) },
      );
    } else {
      createMut.mutate(
        { ...form, date: dateMs },
        {
          onSuccess: () => {
            setOpen(false);
            setForm(blank);
          },
        },
      );
    }
  };
  const isPending = createMut.isPending || updateMut.isPending;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">{events.length} events</p>
        <Button
          size="sm"
          onClick={openAdd}
          className="bg-primary text-primary-foreground font-condensed tracking-widest uppercase gap-1"
          data-ocid="admin.add_button"
        >
          <Plus className="h-4 w-4" /> Add Event
        </Button>
      </div>
      {isLoading && (
        <div
          className="flex justify-center py-12"
          data-ocid="admin.events.loading_state"
        >
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
      {!isLoading && events.length === 0 && (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin.events.empty_state"
        >
          No events yet.
        </div>
      )}
      <div className="space-y-2">
        {events.map((ev, i) => (
          <div
            key={String(ev.id)}
            className="flex items-center justify-between p-3 bg-secondary/50 border border-border rounded-sm"
            data-ocid={`admin.events.item.${i + 1}`}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-condensed font-700 tracking-widest uppercase text-sm">
                  {ev.title}
                </p>
                <StatusBadge status={ev.status} />
              </div>
              <p className="text-xs text-muted-foreground">
                {ev.sportType} · {ev.location}
              </p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-primary"
                onClick={() => openEdit(ev)}
                data-ocid={`admin.edit_button.${i + 1}`}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-destructive"
                onClick={() => setDelTarget(ev)}
                data-ocid={`admin.delete_button.${i + 1}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editing ? "Edit Event" : "Add Event"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Field label="Title">
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                className="bg-input border-border"
                data-ocid="admin.form.input"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Sport Type">
                <Input
                  value={form.sportType}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, sportType: e.target.value }))
                  }
                  className="bg-input border-border"
                />
              </Field>
              <Field label="Status">
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, status: v as Status }))
                  }
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value={Status.upcoming}>Upcoming</SelectItem>
                    <SelectItem value={Status.live}>Live</SelectItem>
                    <SelectItem value={Status.completed}>Completed</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Date & Time">
              <Input
                type="datetime-local"
                value={form.date}
                onChange={(e) =>
                  setForm((p) => ({ ...p, date: e.target.value }))
                }
                className="bg-input border-border"
              />
            </Field>
            <Field label="Location">
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm((p) => ({ ...p, location: e.target.value }))
                }
                className="bg-input border-border"
              />
            </Field>
            <Field label="Description">
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                className="bg-input border-border resize-none"
                rows={3}
              />
            </Field>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              data-ocid="admin.form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={submit}
              disabled={isPending}
              className="bg-primary text-primary-foreground"
              data-ocid="admin.form.submit_button"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : editing ? (
                "Save"
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DeleteConfirm
        open={!!delTarget}
        name={delTarget?.title ?? ""}
        isPending={deleteMut.isPending}
        onConfirm={() =>
          delTarget &&
          deleteMut.mutate(delTarget.id as EventId, {
            onSuccess: () => setDelTarget(null),
          })
        }
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}

// ── News ──────────────────────────────────────────────────────────────────
function NewsTab() {
  const { data: news = [], isLoading } = useGetAllNews();
  const createMut = useCreateNews();
  const updateMut = useUpdateNews();
  const deleteMut = useDeleteNews();

  const blank = { title: "", summary: "", category: "", date: "" };
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState<NewsHighlight | null>(null);
  const [open, setOpen] = useState(false);
  const [delTarget, setDelTarget] = useState<NewsHighlight | null>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(blank);
    setOpen(true);
  };
  const openEdit = (n: NewsHighlight) => {
    setEditing(n);
    setForm({
      title: n.title,
      summary: n.summary,
      category: n.category,
      date: msToDateInput(n.date),
    });
    setOpen(true);
  };
  const submit = () => {
    const dateMs = dateToMs(form.date);
    if (editing) {
      updateMut.mutate(
        { id: editing.id, ...form, date: dateMs },
        { onSuccess: () => setOpen(false) },
      );
    } else {
      createMut.mutate(
        { ...form, date: dateMs },
        {
          onSuccess: () => {
            setOpen(false);
            setForm(blank);
          },
        },
      );
    }
  };
  const isPending = createMut.isPending || updateMut.isPending;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">{news.length} articles</p>
        <Button
          size="sm"
          onClick={openAdd}
          className="bg-primary text-primary-foreground font-condensed tracking-widest uppercase gap-1"
          data-ocid="admin.add_button"
        >
          <Plus className="h-4 w-4" /> Add News
        </Button>
      </div>
      {isLoading && (
        <div
          className="flex justify-center py-12"
          data-ocid="admin.news.loading_state"
        >
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
      {!isLoading && news.length === 0 && (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin.news.empty_state"
        >
          No news yet.
        </div>
      )}
      <div className="space-y-2">
        {news.map((n, i) => (
          <div
            key={String(n.id)}
            className="flex items-center justify-between p-3 bg-secondary/50 border border-border rounded-sm"
            data-ocid={`admin.news.item.${i + 1}`}
          >
            <div className="min-w-0 flex-1">
              <p className="font-condensed font-700 tracking-widest uppercase text-sm truncate">
                {n.title}
              </p>
              <p className="text-xs text-muted-foreground">{n.category}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-primary"
                onClick={() => openEdit(n)}
                data-ocid={`admin.edit_button.${i + 1}`}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-destructive"
                onClick={() => setDelTarget(n)}
                data-ocid={`admin.delete_button.${i + 1}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editing ? "Edit Article" : "Add Article"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Field label="Title">
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                className="bg-input border-border"
                data-ocid="admin.form.input"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Category">
                <Input
                  value={form.category}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, category: e.target.value }))
                  }
                  className="bg-input border-border"
                />
              </Field>
              <Field label="Date">
                <Input
                  type="datetime-local"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                  className="bg-input border-border"
                />
              </Field>
            </div>
            <Field label="Summary">
              <Textarea
                value={form.summary}
                onChange={(e) =>
                  setForm((p) => ({ ...p, summary: e.target.value }))
                }
                className="bg-input border-border resize-none"
                rows={4}
              />
            </Field>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              data-ocid="admin.form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={submit}
              disabled={isPending}
              className="bg-primary text-primary-foreground"
              data-ocid="admin.form.submit_button"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : editing ? (
                "Save"
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DeleteConfirm
        open={!!delTarget}
        name={delTarget?.title ?? ""}
        isPending={deleteMut.isPending}
        onConfirm={() =>
          delTarget &&
          deleteMut.mutate(delTarget.id as NewsId, {
            onSuccess: () => setDelTarget(null),
          })
        }
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}

// ── Sports Categories ─────────────────────────────────────────────────────
function SportsTab() {
  const { data: sports = [], isLoading } = useGetAllSportsCategories();
  const createMut = useCreateSportsCategory();
  const updateMut = useUpdateSportsCategory();
  const deleteMut = useDeleteSportsCategory();

  const blank = { name: "", description: "", iconLabel: "" };
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState<SportsCategory | null>(null);
  const [open, setOpen] = useState(false);
  const [delTarget, setDelTarget] = useState<SportsCategory | null>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(blank);
    setOpen(true);
  };
  const openEdit = (s: SportsCategory) => {
    setEditing(s);
    setForm({
      name: s.name,
      description: s.description,
      iconLabel: s.iconLabel,
    });
    setOpen(true);
  };
  const submit = () => {
    if (editing) {
      updateMut.mutate(
        { id: editing.id, ...form },
        { onSuccess: () => setOpen(false) },
      );
    } else {
      createMut.mutate(form, {
        onSuccess: () => {
          setOpen(false);
          setForm(blank);
        },
      });
    }
  };
  const isPending = createMut.isPending || updateMut.isPending;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {sports.length} categories
        </p>
        <Button
          size="sm"
          onClick={openAdd}
          className="bg-primary text-primary-foreground font-condensed tracking-widest uppercase gap-1"
          data-ocid="admin.add_button"
        >
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </div>
      {isLoading && (
        <div
          className="flex justify-center py-12"
          data-ocid="admin.sports.loading_state"
        >
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
      {!isLoading && sports.length === 0 && (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin.sports.empty_state"
        >
          No sport categories yet.
        </div>
      )}
      <div className="space-y-2">
        {sports.map((s, i) => (
          <div
            key={String(s.id)}
            className="flex items-center justify-between p-3 bg-secondary/50 border border-border rounded-sm"
            data-ocid={`admin.sports.item.${i + 1}`}
          >
            <div className="min-w-0 flex-1 flex items-center gap-3">
              <span className="text-xl shrink-0">{s.iconLabel}</span>
              <div>
                <p className="font-condensed font-700 tracking-widest uppercase text-sm">
                  {s.name}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-xs">
                  {s.description}
                </p>
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-primary"
                onClick={() => openEdit(s)}
                data-ocid={`admin.edit_button.${i + 1}`}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-destructive"
                onClick={() => setDelTarget(s)}
                data-ocid={`admin.delete_button.${i + 1}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editing ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Field label="Name">
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                className="bg-input border-border"
                data-ocid="admin.form.input"
              />
            </Field>
            <Field label="Icon / Emoji">
              <Input
                value={form.iconLabel}
                onChange={(e) =>
                  setForm((p) => ({ ...p, iconLabel: e.target.value }))
                }
                className="bg-input border-border"
                placeholder="⚽ 🏀 🎾"
              />
            </Field>
            <Field label="Description">
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                className="bg-input border-border resize-none"
                rows={3}
              />
            </Field>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              data-ocid="admin.form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={submit}
              disabled={isPending}
              className="bg-primary text-primary-foreground"
              data-ocid="admin.form.submit_button"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : editing ? (
                "Save"
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DeleteConfirm
        open={!!delTarget}
        name={delTarget?.name ?? ""}
        isPending={deleteMut.isPending}
        onConfirm={() =>
          delTarget &&
          deleteMut.mutate(delTarget.id as SportId, {
            onSuccess: () => setDelTarget(null),
          })
        }
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}

// ── Main AdminPanel ───────────────────────────────────────────────────────
export default function AdminPanel({ onClose }: AdminPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-background"
    >
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings2 className="h-5 w-5 text-primary" />
            <span className="font-condensed font-700 tracking-widest uppercase text-lg">
              Admin Panel
            </span>
            <span className="hidden sm:inline text-muted-foreground text-xs font-condensed tracking-widest">
              · BTM X SPORTS
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:text-primary"
            data-ocid="admin.close_button"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Tabs defaultValue="athletes">
          <TabsList className="bg-secondary border border-border w-full grid grid-cols-4 mb-8">
            <TabsTrigger
              value="athletes"
              className="font-condensed tracking-widest uppercase text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.athletes.tab"
            >
              Athletes
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="font-condensed tracking-widest uppercase text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.events.tab"
            >
              Events
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="font-condensed tracking-widest uppercase text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.news.tab"
            >
              News
            </TabsTrigger>
            <TabsTrigger
              value="sports"
              className="font-condensed tracking-widest uppercase text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.sports.tab"
            >
              Sports
            </TabsTrigger>
          </TabsList>
          <TabsContent value="athletes">
            <AthletesTab />
          </TabsContent>
          <TabsContent value="events">
            <EventsTab />
          </TabsContent>
          <TabsContent value="news">
            <NewsTab />
          </TabsContent>
          <TabsContent value="sports">
            <SportsTab />
          </TabsContent>
        </Tabs>
      </main>
    </motion.div>
  );
}
