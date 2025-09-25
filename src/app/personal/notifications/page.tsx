"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Mail,
  MessageSquare,
  CreditCard,
  ArrowLeftRight,
  Gift,
  Shield,
  Trash2,
  Settings,
} from "lucide-react";
import { useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "transaction",
      title: "Payment Received",
      message: "You received 25,000 FCFA from John Doe",
      time: "2 minutes ago",
      read: false,
      icon: ArrowLeftRight,
      color: "text-green-600",
    },
    {
      id: "2",
      type: "security",
      title: "Login Alert",
      message: "New login from Chrome on Windows",
      time: "1 hour ago",
      read: false,
      icon: Shield,
      color: "text-orange-600",
    },
    {
      id: "3",
      type: "reward",
      title: "Cashback Earned",
      message: "You earned 250 FCFA cashback on your ENEO payment",
      time: "3 hours ago",
      read: true,
      icon: Gift,
      color: "text-purple-600",
    },
    {
      id: "4",
      type: "card",
      title: "Card Transaction",
      message: "Card payment of 15,000 FCFA at SuperMarket",
      time: "1 day ago",
      read: true,
      icon: CreditCard,
      color: "text-blue-600",
    },
  ]);

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
    rewardUpdates: true,
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `${unreadCount} unread notifications`
              : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Delivery Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Push Notifications</span>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        pushNotifications: checked,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Email Notifications</span>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        emailNotifications: checked,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">SMS Notifications</span>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        smsNotifications: checked,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Notification Types</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Transaction Alerts</span>
                  <Switch
                    checked={settings.transactionAlerts}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        transactionAlerts: checked,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Security Alerts</span>
                  <Switch
                    checked={settings.securityAlerts}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        securityAlerts: checked,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Marketing Emails</span>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        marketingEmails: checked,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Reward Updates</span>
                  <Switch
                    checked={settings.rewardUpdates}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        rewardUpdates: checked,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-4 border rounded-lg transition-colors ${
                    !notification.read
                      ? "bg-blue-50 border-blue-200"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      !notification.read ? "bg-blue-100" : "bg-muted"
                    }`}
                  >
                    <notification.icon
                      className={`h-5 w-5 ${notification.color}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{notification.title}</h3>
                      {!notification.read && (
                        <Badge variant="default" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
