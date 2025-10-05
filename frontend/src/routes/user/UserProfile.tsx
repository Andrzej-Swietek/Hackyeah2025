import { FC } from 'react';
import { useUserProfile } from '@context/UserProfileProvider.tsx';
import { CheckCircle2, XCircle, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { ProfileItem } from '@components/profiles/ProfileItem.tsx';
import {useTranslation} from "react-i18next";

export const UserProfileTab: FC = () => {
  const { profile, loading, error } = useUserProfile();
  const {t} = useTranslation();


  if (loading)
    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-muted-foreground text-lg">Ładowanie profilu...</p>
        </div>
    );

  if (error || !profile)
    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-destructive text-lg">Błąd ładowania profilu</p>
        </div>
    );

  const {
    id,
    username,
    firstName,
    lastName,
    email,
    emailVerified,
    createdTimestamp,
    enabled,
    realmRoles,
    groups,
    attributes,
  } = profile;

  const formatDate = (timestamp?: number) =>
  timestamp ? new Date(timestamp).toLocaleString() : '—';

  return (
      <div className="flex flex-col items-center justify-center min-h-[90vh] py-12 px-4">
        <Card className="w-full lg:w-3/4 shadow-md rounded-2xl">
          <CardHeader className="flex items-center gap-4">
            <User className="w-8 h-8 text-primary" />
            <CardTitle className="text-2xl font-semibold">
              {t('userProfile.header')}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            <ProfileItem label="ID" value={id} />
            <ProfileItem label={t('userProfile.username')} value={username} />
            <ProfileItem label={t('userProfile.fullName')} value={`${firstName} ${lastName}`} />
            <ProfileItem label="Email" value={email} />
            <ProfileItem
                label={t('userProfile.emailVerified')}
                value={
                  emailVerified
                      ? <CheckCircle2 className="text-green-600 w-5 h-5" />
                      : <XCircle className="text-destructive w-5 h-5" />
                }
            />
            <ProfileItem
                label={t('userProfile.accountActive')}
                value={
                  enabled
                      ? <CheckCircle2 className="text-green-600 w-5 h-5" />
                      : <XCircle className="text-destructive w-5 h-5" />
                }
            />
            <ProfileItem label={t('userProfile.created')} value={formatDate(createdTimestamp)} />

            {realmRoles && realmRoles.length > 0 && (
                <ProfileItem
                    label={t('userProfile.role')}
                    value={realmRoles.map((r) => <Badge key={r} variant="secondary">{r}</Badge>)}
                />
            )}

            {groups && groups.length > 0 && (
                <ProfileItem
                    label={t('userProfile.groups')}
                    value={groups.map((g) => <Badge key={g} variant="secondary">{g}</Badge>)}
                />
            )}

            {attributes && Object.keys(attributes).length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-lg">Atrybuty:</span>
                  <ul className="ml-4 list-disc">
                    {Object.entries(attributes).map(([key, val]) => (
                        <li key={key}>
                          <span className="font-semibold">{key}:</span> {val.join(', ')}
                        </li>
                    ))}
                  </ul>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
  );
};
