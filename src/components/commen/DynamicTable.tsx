import { Loader } from 'lucide-react';
import React from 'react';

interface Column {
    header: string;
    accessor: string;
}

interface Action {
    label: React.ReactNode;
    onClick: () => void;
    isLoading?: boolean;
}

interface DynamicTableProps {
    columns: Column[];
    data: any[];
    actions: (row: any) => Action[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ columns, data, actions }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full my-0 align-middle text-dark border-neutral-200">
                <thead className="align-bottom">
                    <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        {columns.map((col) => (
                            <th key={col.accessor} className="pb-3 text-start min-w-[175px]">
                                {col.header}
                            </th>
                        ))}
                        <th className="pb-3 text-end min-w-[50px]">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-dashed last:border-b-0">
                            {columns.map((col) => (
                                <td key={col.accessor} className="p-3 pl-0">
                                    {row[col.accessor]}
                                </td>
                            ))}
                            <td className="p-3 pr-0 text-end">
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
    );
};

export default DynamicTable;