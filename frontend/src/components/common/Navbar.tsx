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
                    <NavLink to="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                            <MapPin className="h-5 w-5 text-primary-foreground"/>
                        </div>
                        <span className="text-xl font-semibold tracking-tight text-foreground">TripFlow</span>
                    </NavLink>

                    <div className="hidden md:flex items-center gap-6">
                        <NavLink
                            to="/explore"
                            className="text-md font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {t('navbar.explore')}
                        </NavLink>
                        <NavLink
                            to="/user/my-projects"
                            className="text-md font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {t('navbar.myProjects')}
                        </NavLink>
                        <NavLink
                            to="/community"
                            className="text-md font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {t('navbar.community')}
                        </NavLink>
                        <NavLink
                            to="/project-editor"
                            className="text-md font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {t('navbar.newProject')}
                        </NavLink>
                        <NavLink
                            to="/about"
                            className="text-md font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {t('navbar.about')}
                        </NavLink>
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-3 text-md font-medium ">
                    {authenticated
                        ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="hover:!bg-primary">
                                        {profile?.firstName + " " + profile?.lastName}
                                        <User className="h-8 w-8"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        className="!px-8 !py-6 hover:!bg-primary hover:text-primary-foreground">
                                        <NavLink to="/user/my-profile">
                                            {!loading && !error && profile?.email}
                                        </NavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="!px-8 !py-6 hover:!bg-primary hover:text-primary-foreground">
                                        <NavLink to="/user/my-projects">
                                            {t('navbar.myProjects')}
                                        </NavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="!px-8 !py-6 hover:!bg-primary hover:text-primary-foreground">
                                        <NavLink to="/user/reports">
                                            {t("navbar.reports")}
                                        </NavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="!px-8 !py-6 hover:!bg-primary hover:text-primary-foreground">
                                        <NavLink to="/user/settings">
                                            {t('navbar.settings')}
                                        </NavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="!px-8 !py-6 hover:!bg-primary hover:text-primary-foreground">
                                        {t('navbar.help')}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="!px-8 !py-6 hover:!bg-primary hover:text-primary-foreground"
                                        onClick={logout}
                                    >
                                        {t('navbar.signOut')}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        )
                        : (
                            <div className="flex items-center gap-4">
                                <NavLink
                                    to="/auth/login"
                                    className="flex items-center gap-2 text-md font-medium text-muted-foreground hover:text-foreground"
                                >
                                    <User className="h-8 w-8"/> {t("navbar.signIn")}
                                </NavLink>
                                <NavLink
                                    to="/auth/register"
                                    className="px-3 py-1 rounded-lg bg-primary text-primary-foreground text-md font-medium hover:bg-primary/90 transition-colors"
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
