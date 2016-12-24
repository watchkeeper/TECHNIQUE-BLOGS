package xyz.hrui.proxy;

/**
 * 用户查询抽象类
 * @author huangrui
 * @date 2016-12-19
 */
public interface UserManagerSubject {
	Object search(String userName,String key);
}
