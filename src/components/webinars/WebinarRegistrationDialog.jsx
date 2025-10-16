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

export function WebinarRegistrationDialog({ 
  webinar, 
  open, 
  onOpenChange, 
  onConfirm, 
  isRegistered 
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isRegistered ? "Cancel Registration" : "Confirm Registration"}
          </DialogTitle>
          <DialogDescription>
            {isRegistered
              ? "Are you sure you want to cancel your registration for this webinar?"
              : "Please confirm your registration for this webinar."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <h4 className="font-semibold">{webinar.title}</h4>
          <p className="text-sm text-gray-500">Presenter: {webinar.presenter}</p>
          <p className="text-sm text-gray-500">
            Date: {format(webinar.date, "PPP")} at {format(webinar.date, "p")}
          </p>
          <p className="text-sm text-gray-500">Duration: {webinar.duration}</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant={isRegistered ? "destructive" : "default"}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {isRegistered ? "Confirm Cancellation" : "Confirm Registration"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
