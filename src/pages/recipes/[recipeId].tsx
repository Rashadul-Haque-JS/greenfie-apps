import { useRouter } from 'next/router';
import { Recipe } from '../../utils/types';
import recipes from '@/utils/mock-data/recipies';

interface RecipePageProps {
    recipe: Recipe;
}

const RecipePage = ({ recipe }: RecipePageProps) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <iframe
                    className="w-full h-96 text-background"
                    src={recipe.video}
                    title={recipe.title}
                ></iframe>
            </div>
            <div className="max-w-4xl mx-auto my-10">
                <h1 className="text-3xl font-bold mb-5">{recipe.title}</h1>
                <p className="text-gray-700 text-xl mb-5">{recipe.description}</p>
                <h2 className="text-2xl font-bold mb-5">Ingredients</h2>
                <ul className="list-disc pl-5 mb-5">
                    {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                    ))}
                </ul>
                <h2 className="text-2xl font-bold mb-5">Directions</h2>
                <ol className="list-decimal pl-5 mb-5">
                    {recipe.directions?.map((step) => (
                        <li key={step}>{step}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    const paths = recipes.map((recipe: any) => ({ params: { recipeId: recipe.id.toString() } }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: any) {
    const recipe = recipes.find((recipe: any) => recipe.id.toString() === params.recipeId);

    return {
        props: {
            recipe,
        },
        revalidate: 60, // revalidate recipe data every 60 seconds
    };
}


export default RecipePage;
