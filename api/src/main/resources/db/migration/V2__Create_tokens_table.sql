CREATE TABLE `blue_sky`.`tokens` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NOT NULL,
  `token` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`id`));
ALTER TABLE `blue_sky`.`tokens` ADD INDEX `USER_FK_idx` (`user_id` ASC);
ALTER TABLE `blue_sky`.`tokens`
ADD CONSTRAINT `USER_FK` FOREIGN KEY (`user_id`)
REFERENCES `blue_sky`.`users` (`id`)
ON DELETE CASCADE
ON UPDATE RESTRICT;