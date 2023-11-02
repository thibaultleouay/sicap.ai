import { Suspense } from "react";

import { ContractLicitatii } from "@/components/contract-licitatii";
import { getContractLicitatii } from "@sicap/api";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata(props: PageProps) {
  const {
    params: { id },
  } = props;
  const contract = await getContractLicitatii(id);
  const { noticeNo, contractTitle, shortDescription } = contract;

  return {
    title: `${noticeNo} | ${contractTitle}`,
    description: shortDescription,
  };
}

export default async function Page(props: PageProps) {
  const {
    params: { id },
  } = props;

  return (
    <main className="container px-8 py-4 flex flex-col gap-2 lg:max-w-7xl">
      <Suspense fallback={<div className="text-sm">se incarca...</div>}>
        <ContractLicitatii id={id} />
      </Suspense>
    </main>
  );
}
