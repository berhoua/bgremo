"use client"

import { useTheme } from "next-themes";
import { Button as ButtonAria, Menu, MenuItem, MenuItemProps, MenuTrigger, Popover } from 'react-aria-components';
import { LuMoon, LuSun } from "react-icons/lu";

function ActionItem(props: MenuItemProps) {
	return (
		<MenuItem
			{...props}
			className="flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent"
		/>
	);
}

export function ThemeToggle() {
	const { setTheme } = useTheme()

	return (
		<MenuTrigger>
			<ButtonAria
				aria-label="ThemeMenu"
				className="relative group inline-flex items-center justify-center rounded-xl border border-accent bg-foreground/50 px-3 py-2 text-sm text-primary transition-all duration-300 hover:border-[#6C5CE7] hover:shadow-lg hover:shadow-[#6C5CE7]/25 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:text-primary/50 disabled:opacity-50 backdrop-blur-sm"
			>
				<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6C5CE7]/10 to-[#FF7170]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
				<div className="relative">
					<LuSun className="size-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-[#FFB185] group-hover:text-[#FF7170]" />
					<LuMoon className="absolute top-0 size-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-[#6C5CE7]" />
				</div>
				<span className="sr-only">Toggle theme</span>
			</ButtonAria>
			<Popover placement='bottom right' className="origin-top-left overflow-auto rounded-lg border border-accent bg-foreground/50 p-1 shadow-lg ring-1 ring-accent/5 backdrop-blur-md fill-mode-forwards entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95">
				<Menu className="outline-none">
					<ActionItem id="light" onAction={() => setTheme("light")}>
						<LuSun className="mr-2 size-4 text-[#FFB185]" />
						Light
					</ActionItem>
					<ActionItem id="dark" onAction={() => setTheme("dark")}>
						<LuMoon className="mr-2 size-4 text-[#6C5CE7]" />
						Dark
					</ActionItem>
				</Menu>
			</Popover>
		</MenuTrigger>
	)
}