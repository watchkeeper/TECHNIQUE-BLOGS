package xyz.hrui.proxy;

/**
 * 具体的用户业务类
 * @author huangrui
 * @date 2016-12-19
 */
public class UserManagerReal implements UserManagerSubject {

	@Override
	public Object search(String userName, String key) {
		System.out.println("查询" + userName + "成功");
		return userName;
	}

}
