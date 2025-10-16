import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export function DeleteWebinarDialog({ 
  webinar, 
  open, 
  onOpenChange, 
  onConfirm 
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Webinar</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this webinar? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <h4 className="font-semibold">{webinar.title}</h4>
          <p className="text-sm text-gray-500">Presenter: {webinar.presenter}</p>
          <p className="text-sm text-gray-500">
            Date: {format(webinar.date, "PPP")} at {format(webinar.date, "p")}
          </p>
          <p className="text-sm text-gray-500">Duration: {webinar.duration}</p>
          <p className="text-sm text-gray-500">
            Registered Participants: {webinar.registeredCount}/{webinar.capacity}
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Delete Webinar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
