import * as React from "react";

interface SearchBarProps {
  placeholder: string;
  searchIcon: React.ReactElement;
  filterIcon: React.ReactElement;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  searchIcon,
  filterIcon,
}) => {
  return (
    <div className="flex flex-auto gap-5 justify-between px-5 py-2.5 text-sm font-medium tracking-tight text-justify bg-white border border-solid border-slate-300 border-opacity-40 rounded-[70px] text-slate-500 max-md:flex-wrap max-md:max-w-full">
      <div className="flex gap-5">
        {searchIcon}
        <div className="flex-auto">{placeholder}</div>
      </div>
      {filterIcon}
    </div>
  );
};

interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="shrink-0 w-11 aspect-square" />;
};

interface HeaderProps {
  logoText: string;
  searchBarProps: SearchBarProps;
  avatars: AvatarProps[];
}

const Header: React.FC<HeaderProps> = ({ logoText, searchBarProps, avatars }) => {
  return (
    <header className="flex gap-5 justify-between px-12 py-10 bg-white border border-solid border-slate-300 border-opacity-40 max-md:flex-wrap max-md:px-5">
      <div className="flex gap-5 leading-[150%] max-md:flex-wrap max-md:max-w-full">
        <div className="flex-auto my-auto text-3xl font-bold tracking-tighter text-blue-600">
          {logoText}
        </div>
        <SearchBar {...searchBarProps} />
      </div>
      <div className="flex gap-5">
        {avatars.map((avatar, index) => (
          <Avatar key={index} {...avatar} />
        ))}
      </div>
    </header>
  );
};

const MyHeader: React.FC = () => {
  const searchBarProps: SearchBarProps = {
    placeholder: "Search something here",
    searchIcon: <img src="/images/search-normal.svg" alt="Search icon" className="shrink-0 w-6 aspect-square" />,
    filterIcon: <img src="/images/filter.svg" alt="Filter icon" className="shrink-0 w-6 aspect-square" />,
  };

  const avatars: AvatarProps[] = [
    { src: "/images/Settings.svg", alt: "Avatar 1" },
    { src: "/images/Like.svg", alt: "Avatar 2" },
    { src: "/images/Notification.svg", alt: "Avatar 3" },
    { src: "/images/Notif.svg", alt: "Avatar 4" },
  ];

  return (
    <Header logoText="MORENT" searchBarProps={searchBarProps} avatars={avatars} />
  );
};

export default MyHeader;
