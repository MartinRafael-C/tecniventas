// services/apiService.js

export const fetchProductsByCategory = async (category) => {
    let data = [];
    
    try {
      if (category === 'electronics') {
        const res = await fetch('https://dummyjson.com/products/category/smartphones');
        const json = await res.json();
        data = json.products.map(p => ({
          id: `elec-${p.id}`,
          name: p.title,
          description: p.description,
          price: p.price,
          weight: p.weight ? `${p.weight}g` : 'N/A',
          image: p.thumbnail,
        }));
      } 
      
      else if (category === 'appliances') {
        const res = await fetch('https://dummyjson.com/products/category/home-decoration');
        const json = await res.json();
        data = json.products.map(p => ({
          id: `app-${p.id}`,
          name: p.title,
          description: p.description,
          price: p.price,
          weight: p.weight ? `${p.weight}g` : 'N/A',
          image: p.thumbnail,
        }));
      } 
      
      else if (category === 'food') {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const json = await res.json();
        data = json.meals.slice(0, 20).map(m => ({
          id: `food-${m.idMeal}`,
          name: m.strMeal,
          description: m.strInstructions.substring(0, 100),
          price: Math.floor(Math.random() * 50) + 10,
          weight: `${Math.floor(Math.random() * 500) + 200}g`,
          image: m.strMealThumb,
        }));
      } 
      
      else if (category === 'books') {
        const res = await fetch('https://openlibrary.org/subjects/science_fiction.json?limit=20');
        const json = await res.json();
        data = json.works.map(b => ({
          id: `book-${b.key}`,
          name: b.title,
          description: b.subject ? b.subject.slice(0, 3).join(', ') : 'Libro fascinante de ciencia ficción',
          price: Math.floor(Math.random() * 40) + 15,
          weight: `${Math.floor(Math.random() * 300) + 200}g`,
          image: b.cover_id ? `https://covers.openlibrary.org/b/id/${b.cover_id}-L.jpg` : null,
        }));
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };