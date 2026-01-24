import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DuaCardProps {
  title?: string;
  dua?: string | {
    id: number;
    arabic: string;
    source?: string;
    when?: string;
    benefit?: string;
    repetition?: string;
    isGolden?: boolean;
  };
  showActions?: boolean;
}

export default function DuaCard({ title, dua, showActions }: DuaCardProps) {
  // Handle both string and object formats
  const duaData = typeof dua === 'string' 
    ? { id: 0, arabic: dua, isGolden: false }
    : dua;

  if (!duaData) return null;

  return (
    <Card
      className={`
        bg-white/10 backdrop-blur-md border-2
        ${duaData.isGolden
          ? 'border-gold bg-gradient-to-br from-gold/20 to-transparent'
          : 'border-white/20'}
        rounded-3xl overflow-hidden
      `}
    >
      <CardContent className="p-6 space-y-4">
        {/* Title (optional) */}
        {title && (
          <h3 className="text-lg font-bold text-gold text-right">
            {title}
          </h3>
        )}

        {/* Golden Badge */}
        {duaData.isGolden && (
          <Badge className="bg-gold text-black w-fit">
            دعاء مأثور
          </Badge>
        )}

        {/* Arabic Text */}
        <p className="text-xl leading-loose text-right text-cream">
          {duaData.arabic}
        </p>

        {/* Metadata */}
        {duaData.source && (
          <p className="text-cream/70 text-right">📖 المصدر: {duaData.source}</p>
        )}
        {duaData.when && (
          <p className="text-cream/70 text-right">⏰ وقت الدعاء: {duaData.when}</p>
        )}
        {duaData.benefit && (
          <p className="text-cream/70 text-right">✨ الفائدة: {duaData.benefit}</p>
        )}
        {duaData.repetition && (
          <p className="text-cream/70 text-right">🔢 {duaData.repetition}</p>
        )}
      </CardContent>
    </Card>
  );
}
