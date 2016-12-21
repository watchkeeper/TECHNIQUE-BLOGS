package xyz.hrui.proxy;

import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 代理类
 * @author huangrui
 * @date 2016-12-19
 */
public class UserManagerProxy implements UserManagerSubject {

	private UserManagerReal userManager = new UserManagerReal();

	private static final Logger log = LoggerFactory.getLogger(UserManagerProxy.class);

	@Override
	public Object search(String userName, String key) {
		//验证用户
		validate(userName);

		Object result = userManager.search(userName, key);

		//记录日志
		log.info("{1}来查看信息{2}",userName,key);
		return result;
	}

	private void validate(String userName) {
		Objects.requireNonNull(userName);
	}

}
