import { BellFilled } from '@ant-design/icons';
import { Folder, Hub, FScript, FEnty, Star } from '../../assets/icons';

const Icon = ({ icon }) => {
  switch (icon) {
    case 'folder':
      return <img src={Folder} alt={icon} />
    case 'hub':
      return <img src={Hub} alt={icon} />
    case 'script':
      return <img src={FScript} alt={icon} />
    case 'json':
      return <img src={FEnty} alt={icon} class='json'/>
    case 'star':
      return <img src={Star} alt={icon} />
    default:
      return <span></span>
  }
}

export default Icon;