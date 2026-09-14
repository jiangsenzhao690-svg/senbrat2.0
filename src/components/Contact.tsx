import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Github,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Terminal,
  ShieldCheck,
  Copy,
  Check
} from 'lucide-react';
import { MessageLog } from '../types';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<MessageLog[]>([]);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Load message logs from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('brat_pings_v1');
      if (stored) {
        setLogs(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Local storage not accessible in sandbox.', e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');

    setTimeout(() => {
      const newEntry: MessageLog = {
        id: `msg-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim() || 'General Collaboration Inquiry',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      };

      const updated = [newEntry, ...logs].slice(0, 8);
      setLogs(updated);

      try {
        localStorage.setItem('brat_pings_v1', JSON.stringify(updated));
      } catch (err) {
        console.warn('Storage write failed.', err);
      }

      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      setTimeout(() => setStatus('idle'), 4000);
    }, 1200);
  };

  const handleClearLogs = () => {
    setLogs([]);
    try {
      localStorage.removeItem('brat_pings_v1');
    } catch {
      // ignore
    }
  };

  const copyEmailAddress = () => {
    navigator.clipboard.writeText('jiangsenzhao690@gmail.com').then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0B08] relative">
      <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-[#9ACD32]/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Communications & Terminal Log */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="font-mono text-[#9ACD32] uppercase tracking-[0.3em] text-xs font-semibold">
                  [ COMMUNICATIONS & CONNECTION // 终端网络 ]
                </span>
                <h2 className="font-brat text-4xl sm:text-6xl text-white tracking-tighter mt-3 uppercase text-blur-sm">
                  contact-me.联系我
                </h2>
              </motion.div>

              <div className="py-2">
                <a
                  href="mailto:jiangsenzhao690@gmail.com"
                  className="font-brat text-4xl sm:text-5xl md:text-[3.8rem] tracking-tighter uppercase text-[#9ACD32] hover:text-white transition-all underline underline-offset-[10px] decoration-4 text-blur-xs select-none block leading-none"
                >
                  LET'S TALK.
                </a>
              </div>

              <p className="font-mono text-xs text-gray-400 leading-relaxed max-w-md uppercase">
                有任何关于前卫视觉设计、高定制 Web 应用、3D 空间艺术或亚文化声音工程的合作想法？
                欢迎随时发送加密数据包，或直接通过邮件与代码仓库连接。
              </p>

              {/* Direct channels */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-2 bg-[#141614] border border-gray-800 hover:border-[#9ACD32]/50 transition-colors">
                  <a
                    href="mailto:jiangsenzhao690@gmail.com"
                    className="flex items-center space-x-3 text-gray-300 hover:text-[#9ACD32] transition-colors font-mono text-xs"
                  >
                    <div className="p-1.5 bg-[#0d0e0d] border border-gray-800">
                      <Mail className="w-4 h-4 text-[#9ACD32]" />
                    </div>
                    <span>jiangsenzhao690@gmail.com</span>
                  </a>
                  <button
                    onClick={copyEmailAddress}
                    className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#9ACD32]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <a
                  href="https://github.com/senzhao-360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-[#9ACD32] transition-colors font-mono text-xs p-2 bg-[#141614] border border-gray-800 hover:border-[#9ACD32]/50"
                >
                  <div className="p-1.5 bg-[#0d0e0d] border border-gray-800">
                    <Github className="w-4 h-4 text-[#9ACD32]" />
                  </div>
                  <span>github.com/senzhao-360</span>
                </a>
              </div>
            </div>

            {/* Terminal Transmission Logs */}
            <div className="bg-[#141614] border-2 border-dashed border-[#9ACD32]/25 p-5 rounded-none space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <span className="font-mono text-[10px] text-gray-400 flex items-center gap-1.5 uppercase font-semibold">
                  <Terminal className="w-3.5 h-3.5 text-[#9ACD32]" />
                  <span>TERMINAL.本地传输日志</span>
                </span>
                {logs.length > 0 && (
                  <button
                    onClick={handleClearLogs}
                    className="p-1 hover:bg-[#9ACD32]/10 text-gray-500 hover:text-red-400 rounded-none transition-colors cursor-pointer"
                    title="Clear local logs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {logs.length === 0 ? (
                <div className="py-6 text-center text-gray-600 font-mono text-[10px] uppercase">
                  [ 暂无本地连接传输。请填写右侧表单发送数据包 ]
                </div>
              ) : (
                <div className="space-y-3 max-h-[190px] overflow-y-auto pr-1">
                  {logs.map((log) => (
                    <div key={log.id} className="font-mono text-[10px] leading-relaxed border-b border-gray-900 pb-2">
                      <div className="flex justify-between text-gray-400">
                        <span className="text-[#9ACD32] font-semibold">
                          {log.name} // {log.email}
                        </span>
                        <span>{log.timestamp}</span>
                      </div>
                      <div className="text-gray-500 truncate mt-0.5">
                        Topic: "{log.subject}" → {log.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Encrypted Form */}
          <div className="lg:col-span-7 bg-[#141614] border-2 border-[#9ACD32] p-6 sm:p-8 rounded-none relative shadow-xl">
            <span className="absolute top-4 right-4 font-mono text-[9px] text-[#9ACD32] border border-[#9ACD32]/40 px-2 py-0.5 uppercase select-none flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>SSL.SECURED_VIBE</span>
            </span>

            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-brat text-xl text-white uppercase border-b border-[#9ACD32]/20 pb-2 mb-4">
                send-data.建立安全连接
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block">
                    label.您的名字 / IDENTIFIER *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0d0e0d] border border-gray-800 focus:border-[#9ACD32] text-white font-mono text-xs py-3 px-3 rounded-none focus:outline-none transition-colors"
                    placeholder="E.g., Charli / Alex"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block">
                    label.电子邮箱 / SMTP *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0d0e0d] border border-gray-800 focus:border-[#9ACD32] text-white font-mono text-xs py-3 px-3 rounded-none focus:outline-none transition-colors"
                    placeholder="name@domain.world"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block">
                  label.邮件主题 / TOPIC
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#0d0e0d] border border-gray-800 focus:border-[#9ACD32] text-white font-mono text-xs py-3 px-3 rounded-none focus:outline-none transition-colors"
                  placeholder="Subject of collaboration or project..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block">
                  label.消息包内容 / PACKAGE *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#0d0e0d] border border-gray-800 focus:border-[#9ACD32] text-white font-mono text-xs py-3 px-3 rounded-none focus:outline-none resize-none transition-colors"
                  placeholder="Type your message packages here..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-[#9ACD32] text-black font-brat text-sm uppercase py-3.5 px-6 font-extrabold tracking-widest text-center flex items-center justify-center gap-2 border-2 border-transparent hover:bg-black hover:text-[#9ACD32] hover:border-[#9ACD32] transition-all cursor-pointer rounded-none disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>PACKAGING DATA...</span>
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-black" />
                      <span>DATA TRANSFER COMPLETE!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>UPLOAD MESSAGE / 发送数据包</span>
                    </>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <div className="p-3 bg-red-950/40 border border-red-500 font-mono text-[10px] text-red-400 uppercase text-center mt-2 flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>* 错误: 所有带有 * 的必填项都必须填写正确。</span>
                </div>
              )}

              {status === 'success' && (
                <div className="p-3 bg-[#9ACD32]/10 border border-[#9ACD32] font-mono text-[10px] text-[#9ACD32] uppercase text-center mt-2 animate-pulse">
                  * 成功: 数据包已被加密写入本地终端数据库。可在左下方日志中查收。
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
