import * as React from "react";

interface FooterLinkProps {
  title: string;
  links: string[];
}

const FooterLink: React.FC<FooterLinkProps> = ({ title, links }) => {
  return (
    <div className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow max-md:mt-10">
        <h3 className="text-xl font-semibold tracking-tight leading-8 text-gray-900">{title}</h3>
        <div className="mt-12 text-base font-medium tracking-tight leading-6 text-neutral-900 text-opacity-60 max-md:mt-10">
          {links.map((link, index) => (
            <React.Fragment key={index}>
              {link}
              {index !== links.length - 1 && <br />}
              {index !== links.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

function MyFooter() {
  const footerLinks = [
    {
      title: "About",
      links: ["How it works", "Featured", "Partnership", "Bussiness Relation"],
    },
    {
      title: "Community",
      links: ["Events", "Blog", "Podcast", "Invite a friend"],
    },
    {
      title: "Socials",
      links: ["Discord", "Instagram", "Twitter", "Facebook"],
    },
  ];

  return (
    <footer className="flex flex-col px-16 py-16 bg-white max-md:px-5">
      <div className="flex gap-5 items-start w-full max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tighter leading-10 text-blue-600">MORENT</h1>
          <p className="mt-4 text-base font-medium tracking-tight leading-6 text-neutral-900 text-opacity-60">
            Our vision is to provide convenience and help increase your sales business.
          </p>
        </div>
        <div className="flex-auto mt-2.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {footerLinks.map((link, index) => (
              <FooterLink key={index} title={link.title} links={link.links} />
            ))}
          </div>
        </div>
      </div>
      <div className="shrink-0 mt-12 h-px border border-solid bg-neutral-900 bg-opacity-20 border-neutral-900 border-opacity-20 max-md:mt-10 max-md:max-w-full" />
      <div className="flex gap-5 mt-11 w-full text-base font-semibold tracking-tight leading-6 text-gray-900 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex-auto">©2022 MORENT. All rights reserved</div>
        <div className="flex gap-5 text-right">
          <div className="flex-auto">Privacy & Policy</div>
          <div className="flex-auto">Terms & Condition</div>
        </div>
      </div>
    </footer>
  );
}

export default MyFooter;