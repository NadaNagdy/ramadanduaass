import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DuaCardProps {
  dua: {
    id: number;
    arabic: string;
    source?: string;
    when?: string;
    benefit?: string;
    repetition?: string;
    isGolden?: boolean;
  };
}

export default function DuaCard({ dua }: DuaCardProps) {
  return (
    <Card
      className={`
        bg-white/10 backdrop-blur-md border-2
        ${dua.isGolden
          ? 'border-gold bg-gradient-to-br from-gold/20 to-transparent'
          : 'border-white/20'}
        rounded-3xl overflow-hidden
      `}
    >
      <CardContent className="p-6 space-y-4">
        {/* Golden Badge */}
        {dua.isGolden && (
          <Badge className="bg-gold text-black w-fit">
            دعاء مأثور
          </Badge>
        )}

        {/* Arabic Text */}
        <p className="text-xl leading-loose text-right">
          {dua.arabic}
        </p>

        {/* Metadata */}
        {dua.source && <p>📖 المصدر: {dua.source}</p>}
        {dua.when && <p>⏰ وقت الدعاء: {dua.when}</p>}
        {dua.benefit && <p>✨ الفائدة: {dua.benefit}</p>}
        {dua.repetition && <p>🔢 {dua.repetition}</p>}
      </CardContent>
    </Card>
  );
}
