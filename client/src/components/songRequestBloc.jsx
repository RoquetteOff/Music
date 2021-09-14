import SongRequestForm from "./songRequestForm";
import SongRequestInCurrent from "./songRequestInCurrent";

/* This example requires Tailwind CSS v2.0+ */
export default function SongRequestBloc() {
  return (
    <div className="pb-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-10  lg:rounded-md bg-white shadow">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Titre en cours
          </h3>
        </div>
        <div className="bg-white py-8 px-4 sm:px-6 lg:col-span-3  lg:px-8 xl:pl-12">
          <SongRequestForm />
        </div>
        <SongRequestInCurrent />
      </div>
    </div>
  );
}
