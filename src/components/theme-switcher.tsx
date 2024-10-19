"use client";

import * as React from "react";
import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsTrigger } from "./ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Tabs onValueChange={setTheme} value={theme}>
      <TabsList className="h-fit">
        <TabsTrigger
          value="light"
          className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
        >
          <Sun className="size-4" />
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
        >
          <Moon className="size-4" />
        </TabsTrigger>
        <TabsTrigger
          value="system"
          className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
        >
          <Computer className="size-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
