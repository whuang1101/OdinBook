import { motion } from "framer-motion";
import "../css/notification.css"

const Notification = ({content}) => {
    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };
    return (
        <motion.div
        className="notification-background"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="notification-container">
          <motion.div
            className="notification"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: .5 } }}
          >
            {content}
          </motion.div>
        </div>
      </motion.div>
    )
}
export default Notification;