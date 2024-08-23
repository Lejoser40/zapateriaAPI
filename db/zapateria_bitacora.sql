-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: zapateria
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bitacora`
--

DROP TABLE IF EXISTS `bitacora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bitacora` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `accion` varchar(20) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `bitacora_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bitacora`
--

LOCK TABLES `bitacora` WRITE;
/*!40000 ALTER TABLE `bitacora` DISABLE KEYS */;
INSERT INTO `bitacora` VALUES (1,4,'pepe','inicio de session','2024-08-22 16:45:29'),(2,5,'alberto','inicio de session','2024-08-22 16:45:57'),(3,5,'alberto','inicio de session','2024-08-22 16:51:39'),(4,5,'alberto','cierre de session','2024-08-22 16:53:49'),(5,5,'alberto','inicio de session','2024-08-22 16:53:53'),(6,5,'alberto','cierre de session','2024-08-22 17:00:26'),(7,5,'alberto','inicio de session','2024-08-22 17:00:32'),(8,5,'alberto','cierre de session','2024-08-22 17:16:18'),(9,5,'alberto','inicio de session','2024-08-22 17:16:32'),(10,5,'alberto','inicio de session','2024-08-22 17:16:32'),(11,5,'alberto','cierre de session','2024-08-22 17:21:29'),(12,5,'alberto','cierre de session','2024-08-22 17:21:29'),(13,5,'alberto','cierre de session','2024-08-22 17:21:29'),(14,5,'alberto','inicio de session','2024-08-22 17:21:46'),(15,5,'alberto','inicio de session','2024-08-22 17:30:00'),(16,5,'alberto','inicio de session','2024-08-22 17:31:46'),(17,5,'alberto','inicio de session','2024-08-22 17:32:01'),(18,5,'alberto','inicio de session','2024-08-22 17:33:49'),(19,5,'alberto','cierre de session','2024-08-22 17:42:05'),(20,5,'alberto','inicio de session','2024-08-22 17:43:07'),(21,5,'alberto','cierre de session','2024-08-22 17:43:08'),(22,5,'alberto','inicio de session','2024-08-22 17:43:12'),(23,5,'alberto','cierre de session','2024-08-22 17:43:18'),(24,9,'juan','inicio de session','2024-08-22 17:44:21'),(25,9,'juan','cierre de session','2024-08-22 17:44:22'),(26,9,'juan','contraseña erronea','2024-08-22 17:44:27'),(27,9,'juan','contraseña erronea','2024-08-22 17:44:29'),(28,9,'juan','contraseña erronea','2024-08-22 17:44:31'),(29,5,'alberto','contraseña erronea','2024-08-22 17:44:49'),(30,5,'alberto','inicio de session','2024-08-22 17:44:53'),(31,5,'alberto','cierre de session','2024-08-22 17:44:58'),(32,9,'juan','inicio de session','2024-08-22 17:45:02'),(33,9,'juan','cierre de session','2024-08-22 17:45:06'),(34,5,'alberto','inicio de session','2024-08-22 17:45:11'),(35,5,'alberto','inicio de session','2024-08-22 17:46:50'),(36,5,'alberto','cierre de session','2024-08-22 17:48:34'),(37,5,'alberto','inicio de session','2024-08-22 17:50:32'),(38,5,'alberto','inicio de session','2024-08-22 17:55:24'),(39,5,'alberto','cierre de session','2024-08-22 17:55:32'),(40,5,'alberto','inicio de session','2024-08-22 17:55:37'),(41,5,'alberto','inicio de session','2024-08-22 17:57:57'),(42,5,'alberto','cierre de session','2024-08-22 17:59:06'),(43,5,'alberto','inicio de session','2024-08-22 18:15:41'),(44,5,'alberto','cierre de session','2024-08-22 18:15:51'),(45,5,'alberto','inicio de session','2024-08-22 18:17:00'),(46,5,'alberto','inicio de session','2024-08-22 18:25:34'),(47,5,'alberto','cierre de session','2024-08-22 18:25:42');
/*!40000 ALTER TABLE `bitacora` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-22 18:26:56
