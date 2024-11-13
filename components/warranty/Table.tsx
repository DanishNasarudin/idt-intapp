import { WarrantyDataType } from "@/services/common/FetchDB";
import TableRow from "./TableRow";

type Props = {
  data?: WarrantyDataType[];
};

const NewTable = ({ data }: Props) => {
  return (
    <table className="table-fixed text-zinc-400 text-left w-full">
      <thead>
        <tr className="[&>th]:px-2 [&>th]:w-full">
          <th className="w-[100px]">
            <span>Date</span>
          </th>
          <th className="w-[110px]">
            <span>Service No</span>
          </th>
          <th className="w-[80px]">
            <span>IDT PC?</span>
          </th>
          <th className="w-[100px]">
            <span>Received by</span>
          </th>
          <th className="w-[100px]">
            <span>Serviced by</span>
          </th>
          <th className="w-[200px]">
            <span>Name</span>
          </th>
          <th className="w-[120px]">
            <span>Contact</span>
          </th>
          <th className="w-[120px]">
            <span>Status</span>
          </th>
        </tr>
      </thead>
      <tbody className="overflow-hidden">
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <TableRow key={String(index)} data={item} />
          ))}
      </tbody>
    </table>
  );
};

export default NewTable;
