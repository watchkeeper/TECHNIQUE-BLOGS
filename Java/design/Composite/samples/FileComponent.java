package xyz.hrui.combination;

/**
 * �����ļ���������
 * @author huangrui
 * @date 2016-12-21
 */
public interface FileComponent {
	void add(FileComponent file);
	void remove(FileComponent file);
	FileComponent getFile(int i);
	void scanFile(); //ɨ���ļ�ɱ��
}
