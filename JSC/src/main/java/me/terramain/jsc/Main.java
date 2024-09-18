package me.terramain.jsc;

import me.terramain.textexecuter.TextHelper;
import me.terramain.textexecuter.textbuilder.TextBuilder;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static File srcDir = new File("H:\\MIRON\\PROGRAMMING\\OzonPlugin\\plugin");
    public static File destDir = new File("H:\\MIRON\\PROGRAMMING\\OzonPlugin\\compileplugin");
    public static void main(String[] args) {
        destDir.delete();
        destDir.mkdirs();

        try {
            FileUtils.copyDirectory(srcDir, destDir);
        } catch (IOException e) {
            e.printStackTrace();
        }

        List<File> files = TextHelper.readFilesFromFolder(destDir);
        for (File file : files) {
            if (file.getName().endsWith(".jsc.js")){
                loadFile(file);
            }
        }
    }
    public static void loadFile(File file){
        TextBuilder textBuilder = new TextBuilder(TextHelper.readFile(file));
        TextBuilder resultBuilder = new TextBuilder();
        for (String line : textBuilder.getLines()) {
            if (line.startsWith("//JSC:::")){
                line = line.substring(8);
                String[] blocks = line.split(" ");
                if (blocks[0].equals("import")){
                    File importFile = new File( destDir.getName()+File.separator+blocks[1] );
                    resultBuilder.append(TextHelper.readFile(importFile));
                }
            }
            else {
                resultBuilder.append(line);
            }
            resultBuilder.append("\n");
        }
        try {
            FileUtils.write(file, resultBuilder.getText(), "utf-8");
        } catch (IOException e) {throw new RuntimeException(e);}
    }
}
