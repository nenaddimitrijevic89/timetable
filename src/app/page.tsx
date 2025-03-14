import { getCategories } from '../api/categories'
import { Categories } from '../components/categories/Categories'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return <Categories categories={categories.data} />
}
