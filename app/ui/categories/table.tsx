import { UpdateCategory, DeleteCategory } from '@/app/ui/categories/buttons';
import { findAllCategories } from '@/app/repositories/category-repository';

export default async function CategoriesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const categories = await findAllCategories();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {categories?.map((category) => (
              <div
                key={category.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex w-full items-center justify-between pt-4 gap-3 items-stretch">
                  <div className="w-full text-center rounded content-center" style={{ backgroundColor: category.category_background_color, color: category.category_color }}>
                    <b>{category.category_description}</b>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateCategory id={category.id} />
                    <DeleteCategory id={category.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 sm:pl-6">
                  Categoria
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {categories?.map((category) => (
                <tr
                  key={category.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 w-full">
                    <div className="flex items-center rounded-lg justify-center h-9 lh-0.5" style={{ backgroundColor: category.category_background_color, color: category.category_color }}>
                      <b>{category.category_description}</b>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCategory id={category.id} />
                      <DeleteCategory id={category.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
