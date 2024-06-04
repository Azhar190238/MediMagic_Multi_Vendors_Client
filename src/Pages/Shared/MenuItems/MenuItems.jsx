

const MenuItems = ({item}) => {
    const {name, image, price, recipe } =item;
    return (
        <div className="flex space-x-4">
            <img style={{borderRadius: '0 200px 200px  200px'}} className="w-24" src={image} alt="" />
            <div>
                <h1 className="uppercase text-2xl">{name}-------------</h1>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-600">{price}</p>
        </div>
    );
};

export default MenuItems;