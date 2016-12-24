package xyz.hrui.combination;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 文件构件
 * @author huangrui
 * @date 2016-12-21
 */
public class TxtFileLeaf implements FileComponent {

	private static Logger log = LoggerFactory.getLogger(TxtFileLeaf.class);

	private String fileName;

	public TxtFileLeaf(String fn) {
		fileName = fn;
	}

	@Override
	public void add(FileComponent file) {
		log.error("文件里面不能添加文件");
	}

	@Override
	public void remove(FileComponent file) {
		log.error("文件中不能删除文件");
	}

	@Override
	public FileComponent getFile(int i) {
		log.error("不能查询文件子目录");
		return null;
	}

	@Override
	public void scanFile() {
		log.info("start scan {1}",fileName);
	}

}
