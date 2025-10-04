import { FC, useEffect, useState } from 'react';
import { useUserProfile } from '@context/UserProfileProvider';
import { Moon, Sun, UserRoundPen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const THEME_KEY = 'kanban_theme';
const COLOR_KEY = 'kanban_primary_color';

const PALETTE = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Purple', value: '#a21caf' },
  { name: 'Orange', value: '#f59e42' },
];

export const Settings: FC = () => {
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const [theme, setTheme] = useState<'light' | 'dark'>(
      (localStorage.getItem(THEME_KEY) as 'light' | 'dark') || 'light',
  );
  const [primaryColor, setPrimaryColor] = useState<string>(
      localStorage.getItem(COLOR_KEY) || PALETTE[0].value,
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('class', theme);
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.style.setProperty('--primary', primaryColor);
    localStorage.setItem(COLOR_KEY, primaryColor);
  }, [theme, primaryColor]);

  const keycloakAccountUrl = `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/account`;

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
      <>
        {/* Banner */}
        <div className="relative w-full h-40 flex items-center justify-center bg-gradient-to-r from-primary/90 to-primary text-white">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t('settings.hello')} {profile?.firstName} {profile?.lastName}
          </h1>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center min-h-[75vh] py-12">
          <Card className="w-full lg:w-[80%] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">{t('settings.title')}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <SettingRow label={t('settings.keycloak')}>
                <Button
                    variant="outline"
                    className="hover:bg-primary/90 transition-colors"
                    onClick={() => window.open(keycloakAccountUrl, '_blank')}
                >
                  <UserRoundPen className="mr-2 h-4 w-4" />
                  {t('settings.manageAccount')}
                </Button>
              </SettingRow>

              {/*<SettingRow label={t('settings.labels')}>*/}
              {/*  <Button*/}
              {/*      variant="outline"*/}
              {/*      className="hover:bg-primary/90 transition-colors"*/}
              {/*      onClick={() => navigate('/management/labels')}*/}
              {/*  >*/}
              {/*    <UserRoundPen className="mr-2 h-4 w-4" />*/}
              {/*    {t('settings.manageLabels')}*/}
              {/*  </Button>*/}
              {/*</SettingRow>*/}

              {/*<SettingRow label={t('settings.theme')}>*/}
              {/*  <div className="inline-flex gap-2">*/}
              {/*    <Button*/}
              {/*        variant={theme === 'light' ? 'default' : 'outline'}*/}
              {/*        className={`transition-colors ${theme === 'light' ? 'hover:bg-primary/90' : 'hover:bg-primary/90'}`}*/}
              {/*        onClick={() => setTheme('light')}*/}
              {/*    >*/}
              {/*      <Sun className="mr-2 h-4 w-4" />*/}
              {/*      {t('settings.light')}*/}
              {/*    </Button>*/}
              {/*    <Button*/}
              {/*        variant={theme === 'dark' ? 'default' : 'outline'}*/}
              {/*        className={`transition-colors ${theme === 'dark' ? 'hover:bg-primary/90' : 'hover:bg-primary/90'}`}*/}
              {/*        onClick={() => setTheme('dark')}*/}
              {/*    >*/}
              {/*      <Moon className="mr-2 h-4 w-4" />*/}
              {/*      {t('settings.dark')}*/}
              {/*    </Button>*/}
              {/*  </div>*/}
              {/*</SettingRow>*/}

              <SettingRow label={t('settings.primaryColor')}>
                <div className="inline-flex gap-3">
                  {PALETTE.map(color => {
                    const isActive = primaryColor === color.value;
                    return (
                        <button
                            key={color.value}
                            className={`w-8 h-8 rounded-full transition-all hover:scale-110 border-2 ${isActive ? 'border-4 border-primary' : 'border-gray-500'}`}
                            style={{ background: color.value }}
                            onClick={() => setPrimaryColor(color.value)}
                            aria-label={color.name}
                        />
                    );
                  })}
                </div>
              </SettingRow>

              <SettingRow label={t('settings.language')}>
                <div className="inline-flex gap-2">
                  <Button
                      variant={i18n.language === 'en' ? 'default' : 'outline'}
                      className={`transition-colors ${i18n.language === 'en' ? 'hover:bg-primary/90' : 'hover:bg-primary/90'}`}
                      onClick={() => handleChangeLanguage('en')}
                  >
                    EN
                  </Button>
                  <Button
                      variant={i18n.language === 'pl' ? 'default' : 'outline'}
                      className={`transition-colors ${i18n.language === 'pl' ? 'hover:bg-primary/90' : 'hover:bg-primary/90'}`}
                      onClick={() => handleChangeLanguage('pl')}
                  >
                    PL
                  </Button>
                </div>
              </SettingRow>
            </CardContent>
          </Card>
        </div>
      </>
  );
};

const SettingRow: FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
  return (
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <span className="font-medium text-foreground text-lg">{label}</span>
        <div>{children}</div>
      </div>
  );
};
