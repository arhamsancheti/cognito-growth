import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Bell, Palette, Clock, Target, Volume2, Moon, Sun, Smartphone } from "lucide-react";

interface StudentSettingsProps {
  onBack: () => void;
}

const StudentSettings = ({ onBack }: StudentSettingsProps) => {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    grade: "Grade 8",
    email: "alex.johnson@school.edu",
    parentEmail: "parent@email.com"
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    soundEffects: true,
    dailyReminders: true,
    weeklyReports: true,
    difficulty: [6],
    sessionLength: [20],
    practiceGoal: [30]
  });

  const [privacy, setPrivacy] = useState({
    shareWithTeacher: true,
    shareWithParents: true,
    leaderboard: true,
    profileVisibility: "class"
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Settings saved:", { profile, preferences, privacy });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button onClick={onBack} variant="outline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-muted-foreground mt-2">Customize your learning experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade/Class</Label>
                <Select value={profile.grade} onValueChange={(value) => setProfile({ ...profile, grade: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grade 6">Grade 6</SelectItem>
                    <SelectItem value="Grade 7">Grade 7</SelectItem>
                    <SelectItem value="Grade 8">Grade 8</SelectItem>
                    <SelectItem value="Grade 9">Grade 9</SelectItem>
                    <SelectItem value="Grade 10">Grade 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Student Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentEmail">Parent/Guardian Email</Label>
              <Input
                id="parentEmail"
                type="email"
                value={profile.parentEmail}
                onChange={(e) => setProfile({ ...profile, parentEmail: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Set Learning Goals
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Study Schedule
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Smartphone className="h-4 w-4 mr-2" />
              Mobile App
            </Button>
            <Separator />
            <Button className="w-full justify-start" variant="outline">
              Export Progress Report
            </Button>
          </CardContent>
        </Card>

        {/* Learning Preferences */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-primary" />
              Learning Preferences
            </CardTitle>
            <CardDescription>Customize your learning experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Default Difficulty Level</Label>
                <div className="mt-2 space-y-2">
                  <Slider
                    value={preferences.difficulty}
                    onValueChange={(value) => setPreferences({ ...preferences, difficulty: value })}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Beginner (1)</span>
                    <span>Current: Level {preferences.difficulty[0]}</span>
                    <span>Expert (10)</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Session Length (minutes)</Label>
                <div className="mt-2 space-y-2">
                  <Slider
                    value={preferences.sessionLength}
                    onValueChange={(value) => setPreferences({ ...preferences, sessionLength: value })}
                    max={60}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5 min</span>
                    <span>Current: {preferences.sessionLength[0]} min</span>
                    <span>60 min</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Daily Practice Goal (minutes)</Label>
                <div className="mt-2 space-y-2">
                  <Slider
                    value={preferences.practiceGoal}
                    onValueChange={(value) => setPreferences({ ...preferences, practiceGoal: value })}
                    max={120}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10 min</span>
                    <span>Current: {preferences.practiceGoal[0]} min</span>
                    <span>2 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications & Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Push Notifications</Label>
                <p className="text-xs text-muted-foreground">Get study reminders</p>
              </div>
              <Switch
                checked={preferences.notifications}
                onCheckedChange={(checked) => setPreferences({ ...preferences, notifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Sound Effects</Label>
                <p className="text-xs text-muted-foreground">Audio feedback</p>
              </div>
              <Switch
                checked={preferences.soundEffects}
                onCheckedChange={(checked) => setPreferences({ ...preferences, soundEffects: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Daily Reminders</Label>
                <p className="text-xs text-muted-foreground">Practice reminders</p>
              </div>
              <Switch
                checked={preferences.dailyReminders}
                onCheckedChange={(checked) => setPreferences({ ...preferences, dailyReminders: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Weekly Reports</Label>
                <p className="text-xs text-muted-foreground">Progress summaries</p>
              </div>
              <Switch
                checked={preferences.weeklyReports}
                onCheckedChange={(checked) => setPreferences({ ...preferences, weeklyReports: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1 flex items-center">
                {preferences.darkMode ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                <div>
                  <Label className="text-sm font-medium">Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">Toggle theme</p>
                </div>
              </div>
              <Switch
                checked={preferences.darkMode}
                onCheckedChange={(checked) => setPreferences({ ...preferences, darkMode: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2 text-primary" />
              Privacy & Sharing
            </CardTitle>
            <CardDescription>Control how your data is shared and displayed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Share with Teacher</Label>
                  <p className="text-xs text-muted-foreground">Allow teacher to view progress</p>
                </div>
                <Switch
                  checked={privacy.shareWithTeacher}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, shareWithTeacher: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Share with Parents</Label>
                  <p className="text-xs text-muted-foreground">Send reports to parents</p>
                </div>
                <Switch
                  checked={privacy.shareWithParents}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, shareWithParents: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Leaderboard</Label>
                  <p className="text-xs text-muted-foreground">Show in class rankings</p>
                </div>
                <Switch
                  checked={privacy.leaderboard}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, leaderboard: checked })}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-2">
              <Label className="text-sm font-medium">Profile Visibility</Label>
              <Select value={privacy.profileVisibility} onValueChange={(value) => setPrivacy({ ...privacy, profileVisibility: value })}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="class">Class Only</SelectItem>
                  <SelectItem value="teacher">Teacher Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Control who can see your profile and achievements
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Card className="lg:col-span-3">
          <CardContent className="pt-6">
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={onBack}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentSettings;