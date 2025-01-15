
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Description, DialogTitle } from "@radix-ui/react-dialog";

const InviteDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 rounded-lg">
        <div className="p-4">
          {/* Header with Tabs and Close Button */}
          <div className="flex items-center justify-between mb-2">
            <DialogTitle>Share Trip</DialogTitle>
        
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="h-5 w-5 p-1 "
            >
              
            </Button>
          </div>
          <hr  className="mb-3"/>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-base font-medium">Invite your friends to join you in your trip!</h2>
            <Description className="text-sm text-gray-500">Send an invitation to your friends to join this trip and can edit this trip.</Description>
      
            <div className="flex gap-2 mb-2">
              <Input 
                type="email" 
                placeholder="Enter email"
                className="flex-1"
              />
              <Button className="bg-green-100 hover:bg-green-200 text-black" onClick={() => onOpenChange(false)}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;