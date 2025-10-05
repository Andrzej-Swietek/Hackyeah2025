import {MapPin, User} from 'lucide-react';
import {Button} from '@components/ui/button.tsx';
import {FC} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu.tsx';
import {useKeycloak} from '@/context';
import {NavLink} from 'react-router-dom';
import {useUserProfile} from '@context/UserProfileProvider.tsx';
import {useTranslation} from 'react-i18next';


interface NavbarProps {
}

export const Navbar: FC<NavbarProps> = () => {
    const {keycloak, authenticated} = useKeycloak();
    const {profile, loading, error} = useUserProfile();
    const {t} = useTranslation();

    const logout = () => {
        keycloak?.logout();
    };

    return (
        <header
            className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-18 w-full items-center justify-between px-6">
                <div className="flex items-center gap-8">
                    <NavLink href="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                            <MapPin className="h-5 w-5 text-primary-foreground"/>
                        </div>
                        <span className="text-xl font-semibold tracking-tight text-foreground">TripFlow</span>
                    </NavLink>

                    <div className="hidden md:flex items-center gap-6">
                        <NavLink
                            href="/explore"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Explore
                        </NavLink>
                        <NavLink
                            href="/trips"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            My Trips
                        </NavLink>
                        <NavLink
                            href="/community"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Community
                        </NavLink>
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-3">
                    {authenticated
                        ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost">
                                        {profile?.firstName + " " + profile?.lastName}
                                        <User className="h-8 w-8"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="!px-8 !py-6">
                                        <NavLink to="/user/my-profile">
                                            {!loading && !error && profile?.email}
                                        </NavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="!px-8 !py-6">
                                        <NavLink to="/user/my-boards">
                                            {t('navbar.myBoards')}
                                        </NavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="!px-8 !py-6">
                                        <NavLink to="/user/reports">
                                            Reports
                                        </NavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="!px-8 !py-6">
                                        <NavLink to="/user/settings">
                                            {t('navbar.settings')}
                                        </NavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="!px-8 !py-6">{t('navbar.help')}</DropdownMenuItem>
                                    <DropdownMenuItem className="!px-8 !py-6" onClick={logout}>
                                        {t('navbar.signOut')}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )
                        : (
                            <div className="flex items-center gap-4">
                                <NavLink
                                    to="/auth/login"
                                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                                >
                                    <User className="h-8 w-8"/> {t("navbar.signIn")}
                                </NavLink>
                                <NavLink
                                    to="/auth/signup"
                                    className="px-3 py-1 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                                >
                                    {t("navbar.signUp")}
                                </NavLink>
                            </div>
                        )}
                </div>
            </div>
        </header>
    );
};
