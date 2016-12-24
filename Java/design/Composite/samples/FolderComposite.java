package xyz.hrui.combination;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 文件夹构件
 * @author huangrui
 * @date 2016-12-21
 */
public class FolderComposite implements FileComponent {
	private static Logger log = LoggerFactory.getLogger(FolderComposite.class);

	private String folderName;

	private List<FileComponent> children ;

	public FolderComposite(String fn) {
		this.folderName = fn;
		this.children = new ArrayList<>();
	}

	@Override
	public void add(FileComponent file) {
		children.add(file);
	}

	@Override
	public void remove(FileComponent file) {
		children.remove(file);
	}

	@Override
	public FileComponent getFile(int i) {
		return children.get(i);
	}

	@Override
	public void scanFile() {
		log.info("start scan folder {1}",folderName);
		for (FileComponent file : children) {
			file.scanFile();
		}
	}

}
