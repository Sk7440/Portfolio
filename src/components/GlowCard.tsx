import type { CSSProperties, HTMLAttributes } from 'react';
import SpotlightCard from './reactbits/SpotlightCard';

type Props = HTMLAttributes<HTMLDivElement> & { accent?: boolean; surface?: string };

// React Bits SpotlightCard themed for this site: lime light that follows the cursor, square corners.
export default function GlowCard({ accent = false, surface = 'var(--color-surface)', style, ...rest }: Props) {
  return (
    <SpotlightCard
      spotlightColor="#c7f36b"
      intensity={0.12}
      spotlightSize={320}
      borderGlow={0.55}
      proximity={0}
      style={
        {
          '--spotlight-card-surface': surface,
          '--spotlight-card-border': accent ? 'rgb(199 243 107 / 0.28)' : 'var(--color-line)',
          '--spotlight-card-shadow': 'none',
          ...style,
        } as CSSProperties
      }
      {...rest}
    />
  );
}
