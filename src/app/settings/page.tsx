import { HeaderNavProvider } from '@/lib/jotai';

const WorldsPage: React.FC = () => {
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

export default WorldsPage;
