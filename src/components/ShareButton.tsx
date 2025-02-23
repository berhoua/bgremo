"use client"

import { Button as ButtonAria, Menu, MenuItem, MenuItemProps, MenuTrigger, Popover } from 'react-aria-components';
import { LuShare2, LuFacebook, LuMail, LuCopy, LuTwitter } from "react-icons/lu";
import { FaWhatsapp, FaReddit } from "react-icons/fa";
import { toast } from 'sonner';

export function ShareButton() {
    const handleShare = (platform: string) => {
        const url = window.location.href;
        const text = "Remove image backgrounds instantly with AI - Try BG MASK now!";
        
        let shareUrl = '';
        
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
                break;
            case 'reddit':
                shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
                break;
            case 'mail':
                shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                toast.success('Link copied to clipboard!');
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <MenuTrigger>
            <ButtonAria
                aria-label="Share"
                className="relative group inline-flex items-center justify-center gap-2 rounded-xl border border-accent bg-foreground/50 px-3 py-2 text-sm text-primary transition-all duration-300 hover:border-[#6C5CE7] hover:shadow-lg hover:shadow-[#6C5CE7]/25 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:text-primary/50 disabled:opacity-50 backdrop-blur-sm"
            >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6C5CE7]/10 to-[#FF7170]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-center gap-2">
                    <LuShare2 className="size-[1.2rem] text-[#6C5CE7]" />
                    <span className="text-primary">Share us</span>
                </div>
            </ButtonAria>
            <Popover placement='bottom right' className="origin-top-left overflow-auto rounded-lg border border-accent bg-foreground/50 p-1 shadow-lg ring-1 ring-accent/5 backdrop-blur-md fill-mode-forwards entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95">
                <Menu className="outline-none">
                    <ActionItem id="facebook" onAction={() => handleShare('facebook')}>
                        <LuFacebook className="mr-2 size-4 text-[#1877F2]" />
                        Facebook
                    </ActionItem>
                    <ActionItem id="twitter" onAction={() => handleShare('twitter')}>
                        <LuTwitter className="mr-2 size-4 text-[#1DA1F2]" />
                        Twitter
                    </ActionItem>
                    <ActionItem id="whatsapp" onAction={() => handleShare('whatsapp')}>
                        <FaWhatsapp className="mr-2 size-4 text-[#25D366]" />
                        WhatsApp
                    </ActionItem>
                    <ActionItem id="reddit" onAction={() => handleShare('reddit')}>
                        <FaReddit className="mr-2 size-4 text-[#FF4500]" />
                        Reddit
                    </ActionItem>
                    <ActionItem id="mail" onAction={() => handleShare('mail')}>
                        <LuMail className="mr-2 size-4 text-[#EA4335]" />
                        Email
                    </ActionItem>
                    <ActionItem id="copy" onAction={() => handleShare('copy')}>
                        <LuCopy className="mr-2 size-4 text-[#6C5CE7]" />
                        Copy Link
                    </ActionItem>
                </Menu>
            </Popover>
        </MenuTrigger>
    );
}

function ActionItem(props: MenuItemProps) {
    return (
        <MenuItem
            {...props}
            className="group box-border flex w-full cursor-default items-center rounded-md p-2 text-sm text-secondary outline-none focus:bg-background focus:text-primary"
        />
    );
} 