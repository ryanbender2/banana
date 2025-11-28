import { HeaderNavProvider } from '@/lib/jotai';

const WorldsPage: React.FC = () => {
  return (
    <div>
      <HeaderNavProvider
        navs={[
          {
            title: 'Servers',
            href: '/servers',
          },
        ]}
      />
    </div>
  );
};

export default WorldsPage;
