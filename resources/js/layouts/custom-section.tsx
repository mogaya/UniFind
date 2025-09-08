import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    className?: string;
}
const CustomSection: React.FC<SectionProps> = ({ children, className = '' }) => {
    return <section className="${className} mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">{children}</section>;
};

export default CustomSection;
