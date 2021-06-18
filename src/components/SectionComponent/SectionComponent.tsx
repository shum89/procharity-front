import React from 'react';

interface FormProps {
  title: string;
}
export const SectionComponent: React.FC<FormProps> = ({ children, title }) => (
  <section className="section">
    <h2 className="section__title">{title}</h2>
    {children}
  </section>
);
export default SectionComponent;
