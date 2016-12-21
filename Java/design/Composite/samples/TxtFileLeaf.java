package xyz.hrui.combination;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * �ļ�����
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
		log.error("�ļ����治������ļ�");
	}

	@Override
	public void remove(FileComponent file) {
		log.error("�ļ��в���ɾ���ļ�");
	}

	@Override
	public FileComponent getFile(int i) {
		log.error("���ܲ�ѯ�ļ���Ŀ¼");
		return null;
	}

	@Override
	public void scanFile() {
		log.info("start scan {1}",fileName);
	}

}
