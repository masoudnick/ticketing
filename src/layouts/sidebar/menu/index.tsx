import MenuItem from "./menuItem";
import { menuItems } from "@/config";



const Menu = () => {

  return (
    <nav className="space-y-8 text-sm">
      <ul className="mt-3">
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </ul>
    </nav>
  )
}

export default Menu;