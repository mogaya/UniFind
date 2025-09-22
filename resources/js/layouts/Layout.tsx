import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { PropsWithChildren, useState } from 'react';

export default function Layout({ children }: PropsWithChildren) {
    const { auth } = usePage<SharedData>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/lost-items/create', label: 'Report Lost' },
        { href: '/found-items/create', label: 'Report Found' },
        { href: '/found-items', label: 'Found Items' },
        { href: '/my-reports', label: 'My Reports' },
    ];

    const currentLabel = navLinks.find((link) => link.href === window.location.pathname)?.label || 'UniFind';

    return (
        <>
            <Head title={currentLabel}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col">
                {/* Navbar */}

                <header className="border-b p-4">
                    <div className="container mx-auto flex items-center justify-between p-4">
                        {/* Logo */}
                        <h1 className="text-2xl font-bold">
                            <Link href={route('home.index')}>UniFind</Link>
                        </h1>
                        {/* Desktop Nav */}
                        <NavigationMenu className="hidden md:flex">
                            <NavigationMenuList>
                                <div className="flex w-full flex-row justify-between gap-12">
                                    <div className="flex flex-row gap-2">
                                        {navLinks.map((link) => (
                                            <NavigationMenuItem key={link.href}>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href={link.href}
                                                        className={`rounded-md px-3 py-2 text-sm transition-colors ${
                                                            window.location.pathname === link.href
                                                                ? 'bg-primary text-primary-foreground'
                                                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                                        }`}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </NavigationMenuLink>
                                            </NavigationMenuItem>
                                        ))}
                                    </div>
                                    <div>
                                        {auth.user ? (
                                            auth.user.is_admin ? (
                                                <Link
                                                    href={route('dashboard')}
                                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                                >
                                                    Admin Dashboard
                                                </Link>
                                            ) : (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant={'ghost'}>
                                                            <UserInfo user={auth.user} />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                                        align="end"
                                                    >
                                                        <UserMenuContent user={auth.user} />
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )
                                        ) : (
                                            <>
                                                <Link
                                                    href={route('login')}
                                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                                >
                                                    Log in
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </NavigationMenuList>
                        </NavigationMenu>
                        {/* Mobile Nav */}
                        <Button variant={'ghost'} className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </Button>
                    </div>
                    {isMenuOpen && (
                        <div>
                            <div className="flex flex-col border-t-1 py-4 md:hidden">
                                {navLinks.map((link) => (
                                    <Link
                                        href={link.href}
                                        className={`rounded-md px-3 py-2 text-sm transition-colors ${
                                            window.location.pathname === link.href
                                                ? 'font-bold text-primary'
                                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                            <div>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Log in
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </header>
                <main>{children}</main>
                <footer className="mt-6 flex justify-center p-6">
                    <p>&copy; 2025 UniFind</p>
                </footer>
            </div>
        </>
    );
}
