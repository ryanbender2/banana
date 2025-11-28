import { HeaderNavProvider } from '@/lib/jotai';

const WorldsPage: React.FC = async () => {
  return (
    <div>
      <HeaderNavProvider
        navs={[
          {
            title: 'Worlds',
            href: '/worlds',
          },
        ]}
      />
    </div>
  );
};

export default WorldsPage;
