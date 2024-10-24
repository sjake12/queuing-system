import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function UserSettings() {
  return (
    <Card className="w-full self-">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <form action="" className="flex flex-col gap-4 mt-6 md:[&>*]:w-2/4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="avatar">Avatar</Label>
            <Input id="avatar" type="file" />
          </div>
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input id="oldPassword" type="password" />
          </div>
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="reapeatNewPassword">Reapeat New Password</Label>
            <Input id="reapeatNewPassword" type="password" />
          </div>
          <div className="flex gap-2 justify-start">
            <Button type="submit" size="sm">
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
