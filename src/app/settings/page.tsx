import { HeaderNavProvider } from '@/lib/jotai';

const SettingsPage: React.FC = () => {
  return (
    <div>
      <HeaderNavProvider
        navs={[
          {
            title: 'Settings',
            href: '/settings',
          },
        ]}
      />
    </div>
  );
};

export default SettingsPage;
