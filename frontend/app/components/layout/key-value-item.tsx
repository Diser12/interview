export default function KeyValueItem({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex items-center justify-between">
            <span className="font-semibold">{label}</span>
            <span>{value}</span>
        </div>
    );
}