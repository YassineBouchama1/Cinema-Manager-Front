import { Loader } from 'lucide-react';
import React from 'react';

interface Column {
    header: string;
    accessor: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Action {
    label: React.ReactNode;
    onClick: () => void;
    isLoading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DynamicTableProps {
    columns: Column[];
    data: any[]; // Ignore the any warning here
    actions: (row: any) => Action[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ columns, data, actions }) => {
    return (
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full text-sm text-gray-400">
                        <thead className="bg-gray-800 text-xs uppercase font-medium">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.accessor} className="px-6 py-3 text-left tracking-wider">
                                        {col.header}
                                    </th>
                                ))}
                                <th className="px-6 py-3 text-left tracking-wider">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800">
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="bg-black bg-opacity-20">
                                    {columns.map((col) => (
                                        <td key={col.accessor} className="px-6 py-4 whitespace-nowrap">
                                            {row[col.accessor]}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 whitespace-nowrap text-right flex gap-2">
                                        {actions(row).map((action, actionIndex) => (
                                            <button
                                                key={actionIndex}
                                                onClick={action.onClick}
                                                disabled={action.isLoading}
                                                className={`cursor-pointer ${action.isLoading ? 'opacity-50' : ''}`}
                                            >
                                                {action.isLoading ? (
                                                    <Loader size={16} className="animate-spin" />
                                                ) : (
                                                    action.label
                                                )}
                                            </button>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DynamicTable;