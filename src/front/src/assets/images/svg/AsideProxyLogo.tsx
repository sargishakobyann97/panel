const AsideProxyLogo = ({ fill }: { fill: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none">
        <path
            fill={fill ? "#560BAD" : "gray"}
            d="M15.975 2.054a3.977 3.977 0 0 1 3.972 3.972v9.95a3.977 3.977 0 0 1-3.972 3.971h-9.95a3.977 3.977 0 0 1-3.972-3.972v-9.95a3.977 3.977 0 0 1 3.972-3.972h9.95m0-2.053h-9.95A6.026 6.026 0 0 0 0 6.026v9.949A6.025 6.025 0 0 0 6.025 22h9.95A6.025 6.025 0 0 0 22 15.975v-9.95A6.025 6.025 0 0 0 15.975 0ZM6.088 17.343a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3Zm11.474-1.65c0-.85-.69-1.54-1.54-1.54h-4.539a1.54 1.54 0 1 0 0 3.08h4.539c.85 0 1.54-.69 1.54-1.54ZM17.507 11c0-.85-.69-1.54-1.54-1.54H6.033a1.54 1.54 0 1 0 0 3.08h9.934c.85 0 1.54-.689 1.54-1.54Zm-1.595-6.273a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3ZM4.438 6.377c0 .85.69 1.54 1.54 1.54h4.539a1.54 1.54 0 0 0 0-3.08H5.978c-.85 0-1.54.69-1.54 1.54Z"
        />
    </svg>
);
export default AsideProxyLogo;
