import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CustomJobTitle() {
  return (
    <div className="p-4 flex flex-col items-center mx-auto gap-6 mt-4 max-w-lg">
      <h1 className="text-3xl font-semibold text-center">
        Enter the job titles you have in mind
      </h1>
      <div className="w-full">
        <label htmlFor="">Job #1</label>
        <Input placeholder="Enter #1 job title" />
      </div>
      <div className="w-full">
        <label htmlFor="">Job #2</label>
        <Input placeholder="Enter #2 job title" />
      </div>
      <div className="w-full">
        <label htmlFor="">Job #3</label>
        <Input placeholder="Enter #3 job title" />
      </div>
      <Button className="self-end px-10 py-5">Continue</Button>
    </div>
  );
}
